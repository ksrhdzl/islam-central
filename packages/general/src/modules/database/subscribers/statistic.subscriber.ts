// import {
//   EventSubscriber,
//   EntitySubscriberInterface,
//   InsertEvent,
// } from "typeorm";
// import { v7 as uuidv7 } from "uuid";
// import { StatisticEntity } from "./../entities/statistic.entity";

// @EventSubscriber()
// export class StatisticSubscriber
//   implements EntitySubscriberInterface<StatisticEntity>
// {
//   listenTo() {
//     return StatisticEntity;
//   }

//   beforeInsert(event: InsertEvent<StatisticEntity>) {
//     if (!event.entity.id) {
//       event.entity.id = uuidv7();
//     }
//   }
// }
