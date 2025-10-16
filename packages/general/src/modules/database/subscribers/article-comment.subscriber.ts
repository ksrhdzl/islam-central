import { EventSubscriber, EntitySubscriberInterface, LoadEvent } from 'typeorm';
import {
  ArticleCommentEntity,
  ArticleCommentUserTypeEnum,
  OperatorEntity,
  CustomerEntity,
} from './../entities';

@EventSubscriber()
export class ArticleCommentSubscriber
  implements EntitySubscriberInterface<ArticleCommentEntity>
{
  listenTo() {
    return ArticleCommentEntity;
  }

  async afterLoad(
    entity: ArticleCommentEntity,
    event?: LoadEvent<ArticleCommentEntity>,
  ): Promise<any> {
    if (event?.queryRunner) {
      try {
        if (entity.userType == ArticleCommentUserTypeEnum.CUSTOMER) {
          entity.user = await event.manager.findOneOrFail(CustomerEntity, {
            where: {
              id: entity.userId,
            },
            relations: {
              avatar: true,
            },
          });
        } else if (entity.userType == ArticleCommentUserTypeEnum.OPERATOR) {
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
