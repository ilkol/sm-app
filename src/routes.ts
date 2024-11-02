import {
	createHashRouter,
	createPanel,
	createRoot,
	createView,
	RoutesConfig,
} from '@vkontakte/vk-mini-apps-router';

export const DEFAULT_ROOT = 'default_root';

export const DEFAULT_VIEW = 'default_view';

export const DEFAULT_VIEW_PANELS = {
	HOME: 'home',
	CHAT: 'chat',
	CHAT_USER: 'chatUser'
} as const;

export const routes = RoutesConfig.create([
	createRoot(DEFAULT_ROOT, [
		createView(DEFAULT_VIEW, [
		createPanel(DEFAULT_VIEW_PANELS.HOME, '/', []),
		createPanel(DEFAULT_VIEW_PANELS.CHAT, "/chat/:chat", []),
		createPanel(DEFAULT_VIEW_PANELS.CHAT_USER, "/chat/:chat/user/:user", [])
		]),
	]),
]);

export const router = createHashRouter(routes.getRoutes());
