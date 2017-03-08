import node from "rollup-plugin-node-resolve";

export default {
        entry: "src/wired.js",
        format: "umd",
        moduleName: "wired",
        plugins: [node()],
        dest: "wired.js"
};
