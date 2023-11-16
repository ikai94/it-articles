import { rtkApi } from 'shared/api/rtkApi';
import { Notification } from '../model/types/notification';

// инициализация api для получения предупреждений из базы
const notificationApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        // название для хука
        getNotifications: build.query<Notification[], null>({
            // параметры которые будут использоваться
            query: () => ({
                url: '/notifications',
            }),
        }),
    }),
});

// инициализация автоматически созданного хука
export const useNotifications = notificationApi.useGetNotificationsQuery;
