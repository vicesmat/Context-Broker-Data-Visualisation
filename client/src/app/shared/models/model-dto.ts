import { Entity } from './entity';

export interface ModelDto {
    type: string;
    cometUrl: string;
    service: string;
    servicePath: string;
    data: Entity[];
}
