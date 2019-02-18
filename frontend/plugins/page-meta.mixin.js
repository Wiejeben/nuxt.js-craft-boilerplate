export default {
    async asyncData({app, route}) {
        return {
            metaInfo: await app.meta(route)
        }
    },

    head() {
        return this.metaInfo
    }
}
