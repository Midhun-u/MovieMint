import { Op } from "sequelize";
import { Notification } from "../schemas/notification.schema";
import { NotificationBody } from "../types/notificationBody";

// Notification model
export const NotificationModel = {

    addNotification: async (data: Omit<NotificationBody & { status: "PENDING" | "AVAILABLE" }, "availableDate">) => {

        const newNotification = await Notification.create({
            user_id: data.userId.trim(),
            title: data.title.trim(),
            message: data.message.trim(),
            success: data.success,
            type: data.type,
            metadata: data.metadata,
            isRead: false,
            status: data.status.trim()
        })

        return newNotification.dataValues

    },

    updateNotificationById: async (id: string, updateData: object) => {

        const [updatedCount, updatedDocuments] = await Notification.update(updateData, {
            where: {
                id: {
                    [Op.eq]: id
                }
            },
            returning: true
        })

        return {updatedCount, updatedDocuments}

    },

    getNotificationsByUserId: async (userId: string, page: number, limit: number) => {

        const notifications = await Notification.findAll({
            where: {
                [Op.and]: [
                    {user_id: userId},
                    {status: "AVAILABLE"}
                ]
            },
            raw: true,
            order: [["createdAt", "DESC"]],
            offset: (page - 1) * limit,
            limit: limit,
        })

        return notifications

    },

    getNotificationById: async (id: string) => {

        const notification = await Notification.findByPk(id, {
            raw: true,
            nest: true
        })

        return notification

    },

    deleteNotificationById: async (id: string) => {

        const deletedCount = await Notification.destroy({
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        })

        return deletedCount

    }

}