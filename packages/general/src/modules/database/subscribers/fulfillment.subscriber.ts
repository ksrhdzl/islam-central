import { EventSubscriber, EntitySubscriberInterface, LoadEvent } from 'typeorm';
import {
  FulfillmentEntity,
  FulfillmentAddressEntity,
  FulfillmentAddressTypeEnum,
} from './../entities';

@EventSubscriber()
export class OperatorSubscriber
  implements EntitySubscriberInterface<FulfillmentEntity>
{
  listenTo() {
    return FulfillmentEntity;
  }

  async afterLoad(
    entity: FulfillmentEntity,
    event?: LoadEvent<FulfillmentEntity>,
  ): Promise<any> {
    if (event?.queryRunner) {
      try {
        entity.pickupAddress = await event.manager.findOneOrFail(
          FulfillmentAddressEntity,
          {
            where: {
              fulfillmentId: entity.id,
              type: FulfillmentAddressTypeEnum.PICKUP,
            },
          },
        );
        entity.dropoffAddress = await event.manager.findOneOrFail(
          FulfillmentAddressEntity,
          {
            where: {
              fulfillmentId: entity.id,
              type: FulfillmentAddressTypeEnum.DROPOFF,
            },
          },
        );
      } catch (error) {
        console.error('Error loading addresses:', error);
      }
    }
  }
}
