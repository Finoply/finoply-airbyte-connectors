import {AirbyteConfig, AirbyteLogger} from 'faros-airbyte-cdk';
import {Client} from 'ssh2';

export interface ChaseConfig extends AirbyteConfig {
  readonly host: string;
  readonly user: string;
  readonly password: string;
  readonly port: number;
}

export class Chase {
  constructor(
    private readonly client: Client,
    private readonly config: ChaseConfig,
    private readonly logger: AirbyteLogger
  ) {}

  static instance(config: ChaseConfig, logger: AirbyteLogger): Chase {
    return new Chase(new Client(), config, logger);
  }

  async checkConnection(): Promise<void> {
    console.log(this.config);
    const host = 'localhost';

    return new Promise<void>((resolve, reject) => {
      this.client
        .on('ready', () => {
          this.client.destroy();
          resolve();
        })
        .on('error', (err: Error) => {
          this.client.destroy();
          reject(err);
        })
        .connect({
          host: this.config.host,
          port: this.config.port,
          username: this.config.user,
          password: this.config.password,
        });
    });
  }
}
