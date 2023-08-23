import {Command} from 'commander';
import {
  AirbyteConfig,
  AirbyteLogger,
  AirbyteSourceBase,
  AirbyteSourceRunner,
  AirbyteSpec,
  AirbyteStreamBase,
} from 'faros-airbyte-cdk';
import VError from 'verror';

import {Chase, ChaseConfig} from './chase';
import {Builds} from './streams';

/** The main entry point. */
export function mainCommand(): Command {
  const logger = new AirbyteLogger();
  const source = new ChaseSource(logger);
  return new AirbyteSourceRunner(logger, source).mainCommand();
}

/** Example source implementation. */
export class ChaseSource extends AirbyteSourceBase<ChaseConfig> {
  async spec(): Promise<AirbyteSpec> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return new AirbyteSpec(require('../resources/spec.json'));
  }
  async checkConnection(config: ChaseConfig): Promise<[boolean, VError]> {
    try {
      const chase = Chase.instance(config, this.logger);
      await chase.checkConnection();
    } catch (err: any) {
      return [false, err];
    }

    return [true, undefined];
  }
  streams(): AirbyteStreamBase[] {
    return [new Builds(this.logger)];
  }
}
