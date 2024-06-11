import Link from "next/link";
import React from "react";

const ServerUrl = process.env.NEXT_PUBLIC_BASE_URL;
const DocsPage = () => {
  const fetchExample = `
	fetch('${ServerUrl}/request', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization:'Bearer your-token',
    },
    body: JSON.stringify({
      responseTimeInMs: time-in-ms,
      statusCode: status-code,
      projectId: your project id,
      endPoint: end-point,
    }),
  });
	`;
  const codeExample = `
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, timeout } from 'rxjs/operators';

@Injectable()
export class AverageFetchTimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = Date.now();
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const route = request.route;
    const response = httpContext.getResponse();
    let errorMessage = '';

    console.log(\`Route: \${route.path}\`);

    const handler = next.handle();

    return handler.pipe(
      catchError((err) => {
        response.statusCode = err.status || 500;
        errorMessage = err.message || 'Internal server error';

        return throwError(err);
      }),
      finalize(async () => {
        const endTime = Date.now();
        const elapsedTime = endTime - startTime;
        const statusCode = response.statusCode;

        console.log(\`Response time: \${elapsedTime}ms\`);
        console.log(route.path, statusCode, errorMessage);

        await fetch('${ServerUrl}/request', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer your-token',
          },
          body: JSON.stringify({
            responseTimeInMs: elapsedTime,
            statusCode: statusCode,
            projectId: 'your-project-id',
            endPoint: route.path,
          }),
        });
      }),
      timeout(5000),
    );
  }
}
`;

  return (
    <div className="p-10">
      <h2 className="scroll-m-20 text-white border-borderGray border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        The API integration documentation
      </h2>
      <div className="text-white mt-10">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Step 1
        </h4>
        <p className="leading-7 ml-3 [&:not(:first-child)]:mt-6">
          Create project{" "}
          <Link className="underline" href={"/auth/create-project"}>
            here
          </Link>{" "}
          and save the project ID and token.
        </p>
        <h4 className="scroll-m-20 mt-10 text-xl font-semibold tracking-tight">
          Step 2
        </h4>
        <p className="leading-7 ml-3 [&:not(:first-child)]:mt-6">
          Create the interceptor which will send the request for this API data
          of your request.
        </p>
        <p className="leading-7 ml-3 [&:not(:first-child)]:mt-6">
          Here is a example of fetch request:
        </p>
        <blockquote className="mt-6 border-l-2 pl-6 italic">
          <pre className="whitespace-pre-wrap">{fetchExample}</pre>
        </blockquote>
        <p className="leading-7 ml-3 [&:not(:first-child)]:mt-6">
          Here is a code example in NestJS:
        </p>
        <blockquote className="mt-6 border-l-2 pl-6 italic">
          <pre className="whitespace-pre-wrap">{codeExample}</pre>
        </blockquote>
      </div>
    </div>
  );
};

export default DocsPage;
