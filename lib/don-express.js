
module.exports = function (app, fs, don, viewDir) {


    var views = {};


    fs.readdirSync(viewDir).forEach(function (file) {
        if (file.match(/\.js$/)) {
            views[file.replace(/\.js$/, '')] = require(viewDir + '/' + file);
        }
    });



    return {

        views: views,

        renderer: function (req, res, next) {

            res.render = function (layout, locals, cb) {

                var data = {}, l, html;

                for (l in app.locals) data[l] = app.locals[l];
                for (l in res.locals) data[l] = res.locals[l];
                for (l in locals) {
                    if (l !== 'partials') data[l] = locals[l]; 
                }
                if (locals.partials) {
                    for (l in locals.partials) data[l] = views[locals.partials[l]];
                } 

                try {
                    html = '<!DOCTYPE html>' + don(views[layout], data);
                    res.send(html);
                    cb && cb(null, html);

                } catch (e) {
                    console.log(e);
                    res.send(500, "don-express: failed to render layout: '" + layout + '" with data: \n' + JSON.stringify(data));
                    cb && cb(e);
                } 
            };

            next();
        }
    }
};