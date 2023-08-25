import {AirbyteStreamBase, StreamKey, SyncMode} from 'faros-airbyte-cdk';
import {Dictionary} from 'ts-essentials';

import {Record} from '../types';

export class Records extends AirbyteStreamBase {
  async *readRecords(
    syncMode: SyncMode,
    cursorField?: string[],
    streamSlice?: Dictionary<any>,
    streamState?: Dictionary<any>
  ): AsyncGenerator<Record> {
    const record: Record = {
      col1: 'Column1',
      col2: 'Column2',
      col3: 'Column3',
    };
    yield record;
  }
  getJsonSchema(): Dictionary<any> {
    return require('../../resources/schemas/records.json');
  }
  get primaryKey(): StreamKey | undefined {
    return undefined;
  }
}
