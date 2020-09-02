/**
 * 
 * @param {Array} allSettleds 
 * @param {Function} fnCallback 
 */
export const compatibleWith = (allSettleds = [], fnCallback) => {
    return allSettleds.map(item => {
        let template;
        if (item.status === "rejected") {
            if ("function" === typeof fnCallback) {
                fnCallback(item);
            }
            template = {};
        } else {
            template = item.value;
        }
        return template;
    });
}