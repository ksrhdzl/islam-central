import { EventSubscriber, EntitySubscriberInterface, LoadEvent } from 'typeorm';
import {
  ProductCommentEntity,
  ProductCommentUserTypeEnum,
  OperatorEntity,
  CustomerEntity,
} from './../entities';

@EventSubscriber()
export class ProductCommentSubscriber
  implements EntitySubscriberInterface<ProductCommentEntity>
{
  listenTo() {
    return ProductCommentEntity;
  }

  async afterLoad(
    entity: ProductCommentEntity,
    event?: LoadEvent<ProductCommentEntity>,
  ): Promise<any> {
    if (event?.queryRunner) {
      try {
        if (entity.userType == ProductCommentUserTypeEnum.CUSTOMER) {
          entity.user = await event.manager.findOneOrFail(CustomerEntity, {
            where: {
              id: entity.userId,
            },
            relations: {
              avatar: true,
            },
          });
        } else if (entity.userType == ProductCommentUserTypeEnum.OPERATOR) {
          entity.user = await event.manager.findOneOrFail(OperatorEntity, {
            where: {
              id: entity.userId,
            },
            relations: {
              avatar: true,
            },
          });
        }
      } catch (error) {
        console.error('Error loading user:', error);
      }
    }
  }
}
