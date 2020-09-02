const cookieParser = process.server ? require('cookieparser') : undefined;
const Cookie = process.client ? require('js-cookie') : undefined;

export const state = () => ({
    auth: null,
    profile: null
});

export const mutations = {
    setAuth(state, payload) {
        if (Cookie) {
            Cookie.set('auth', payload);
        }
        state.auth = payload;
    },
    setProfile(state, payload) {
        state.profile = payload;
    },
    logoutAuth(state, payload) {
        Cookie.remove('auth');
        state.auth = null;
        if ("function" == typeof payload) {
            payload();
        };
    }
};


export const actions = {
    /**
     * 初始化容器数据，传递给客户端使用
     * @param {Object} commit 
     * @param {Object} req 
     */
    nuxtServerInit({ commit }, { req }) {
        let auth = null
        if (req.headers.cookie) {
            const parsed = cookieParser.parse(req.headers.cookie);
            try {
                auth = JSON.parse(parsed.auth);
            } catch (err) {
                console.error(err);
            }
        }

        commit('setAuth', auth);
    }
};


