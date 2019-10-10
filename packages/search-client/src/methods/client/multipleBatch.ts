import { RequestOptions } from '@algolia/transporter-types';
import { SearchClient } from '../../SearchClient';
import { Method } from '@algolia/requester-types';
import { ConstructorOf, WaitablePromise } from '@algolia/support';
import { BatchRequest } from '../index/batch';
import { MultipleBatchResponse } from '../types/MultipleBatchResponse';
import { HasWaitTask, waitTask } from '../index/waitTask';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const multipleBatch = <TSearchClient extends ConstructorOf<SearchClient>>(
  base: TSearchClient
) => {
  return class extends base implements HasMultipleBatch {
    public multipleBatch(
      requests: readonly BatchRequest[],
      requestOptions?: RequestOptions
    ): Readonly<WaitablePromise<MultipleBatchResponse>> {
      return WaitablePromise.from<MultipleBatchResponse>(
        this.transporter.write(
          {
            method: Method.Post,
            path: `1/indexes/*/batch`,
            data: {
              requests,
            },
            cacheable: true,
          },
          requestOptions
        )
      ).onWait(response =>
        Promise.all(
          Object.keys(response.taskID).map(indexName => {
            const index = this.initIndex<HasWaitTask>(indexName, {
              methods: [waitTask],
            });

            return index.waitTask(response.taskID[indexName]);
          })
        )
      );
    }
  };
};

export type HasMultipleBatch = SearchClient & {
  readonly multipleBatch: (
    requests: readonly BatchRequest[],
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<MultipleBatchResponse>>;
};