import {cacheAdapterEnhancer} from "axios-extensions";

export default function ({app}) {
    const defaults = app.$axios.defaults;

    defaults.adapter = cacheAdapterEnhancer(defaults.adapter);
    defaults.headers.common["Accept"] = "application/json";
    defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
}
