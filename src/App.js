"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./App.scss");
const Simulations_1 = __importDefault(require("./Simulations/Simulations"));
const react_router_dom_1 = require("react-router-dom");
const About_1 = __importDefault(require("./About"));
const SiteLayout_1 = __importDefault(require("./Simulations/SiteLayout"));
function App() {
    return (react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
        react_1.default.createElement(react_router_dom_1.Routes, null,
            react_1.default.createElement(react_router_dom_1.Route, { element: react_1.default.createElement(SiteLayout_1.default, null) },
                react_1.default.createElement(react_router_dom_1.Route, { path: "/a-propos", element: react_1.default.createElement(About_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(Simulations_1.default, null) })))));
}
exports.default = App;
