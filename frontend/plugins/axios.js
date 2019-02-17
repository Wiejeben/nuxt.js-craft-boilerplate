import {cacheAdapterEnhancer} from 'axios-extensions'

export default function ({app}) {
    const defaults = app.$axios.defaults;

    // Caches all GET requests by default
    defaults.adapter = cacheAdapterEnhancer(defaults.adapter);
}
