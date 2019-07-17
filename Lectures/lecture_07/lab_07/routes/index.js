const aboutRoutes = require("./animals");
// const storyRoutes = require("./likes");
// const educationRoutes = require("./posts")

const constructorMethod = app => {
    app.use("/animals", aboutRoutes);
    // app.use("/likes", storyRoutes);
    // app.use("/posts", educationRoutes)

    app.use("*", (req, res) => {
        res.status(404).json({
            error: "Not found"
        });
    });
};

module.exports = constructorMethod;