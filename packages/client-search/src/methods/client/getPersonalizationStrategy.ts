import { MethodEnum } from '@algolia/requester-common/src/types/MethodType';
import { RequestOptions } from '@algolia/transporter/src/types/RequestOptions';
import { TransporterAware } from '@algolia/transporter/src/types/TransporterAware';

import { GetPersonalizationStrategyResponse } from '../../types/GetPersonalizationStrategyResponse';

export const getPersonalizationStrategy = <TClient extends TransporterAware>(
  base: TClient
): TClient & HasGetPersonalizationStrategy => {
  return {
    ...base,
    getPersonalizationStrategy(
      requestOptions?: RequestOptions
    ): Readonly<Promise<GetPersonalizationStrategyResponse>> {
      return this.transporter.read(
        {
          method: MethodEnum.Get,
          path: '1/recommendation/personalization/strategy',
        },
        requestOptions
      );
    },
  };
};

export type HasGetPersonalizationStrategy = {
  readonly getPersonalizationStrategy: (
    requestOptions?: RequestOptions
  ) => Readonly<Promise<GetPersonalizationStrategyResponse>>;
};