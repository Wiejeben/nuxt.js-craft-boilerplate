export default {
    async asyncData({app, route}) {
        let path = route.path;

        return {
            metaInfo: await app.meta(route),
            slug: path.substring(path.lastIndexOf("/") + 1),
        }
    },

    head() {
        return this.metaInfo
    }
}
