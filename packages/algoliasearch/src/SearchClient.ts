import { search, HasSearch } from '@algolia/search-client/src/methods/index/search';
import {
  searchForFacetValues,
  HasSearchForFacetValues,
} from '@algolia/search-client/src/methods/index/searchForFacetValues';
import { SearchClient as BaseSearchClient } from '@algolia/search-client';

export type SearchIndex = BaseSearchClient & HasSearch & HasSearchForFacetValues;

export class SearchClient extends BaseSearchClient {
  public initIndex<TSearchIndex = SearchIndex>(indexName: string): TSearchIndex {
    return super.initIndex(indexName, {
      methods: [search, searchForFacetValues],
    });
  }
}