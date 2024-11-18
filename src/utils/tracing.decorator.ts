import { SpanStatusCode, trace } from "@opentelemetry/api";

export function Tracing(): MethodDecorator {
	return (target, propertyKey, descriptor: PropertyDescriptor) => {
		const name = target.constructor.name;
		const tracer = trace.getTracer(name);
		const originalMethod = descriptor.value;

		descriptor.value = function (...args: any[]) {
			return tracer.startActiveSpan(
				`${name}.${propertyKey.toString()}`,
				(span) => {
					try {
						const result = originalMethod.apply(this, args);
						if (result instanceof Promise) {
							result
								.then(() => span.end())
								.catch((err) => {
									span.setStatus({ code: SpanStatusCode.ERROR });
									span.recordException(err);
									span.end();
								});
						} else {
							span.setStatus({ code: SpanStatusCode.OK });
							span.end();
						}
						return result;
					} catch (err) {
						span.setStatus({ code: SpanStatusCode.ERROR });
						span.recordException(err);
						span.end();
					}
				},
			);
		};

		return descriptor;
	};
}

export function ClassTracing(): ClassDecorator {
	return (target) => {
		const name = target.name;
		const tracer = trace.getTracer(name);
		const properties = Object.getOwnPropertyNames(target.prototype);
		properties.forEach((propertyKey) => {
			const property = target.prototype[propertyKey];
			if (typeof property === "function" && propertyKey !== "constructor") {
				const originalMethod = target.prototype[propertyKey];
				target.prototype[propertyKey] = function (...args: any[]) {
					return tracer.startActiveSpan(`${name}.${propertyKey}`, (span) => {
						try {
							const result = originalMethod.apply(this, args);
							if (result instanceof Promise) {
								result
									.then(() => span.end())
									.catch((err) => {
										span.setStatus({ code: SpanStatusCode.ERROR });
										span.recordException(err);
										span.end();
									});
							} else {
								span.setStatus({ code: SpanStatusCode.OK });
								span.end();
							}
							return result;
						} catch (err) {
							span.setStatus({ code: SpanStatusCode.ERROR });
							span.recordException(err);
							span.end();
						}
					});
				};

				const keys = Reflect.getOwnMetadataKeys(property);
				keys.forEach((key) => {
					const value = Reflect.getMetadata(key, property);
					Reflect.defineMetadata(key, value, target.prototype[propertyKey]);
				});
			}
		});

		return target;
	};
}
