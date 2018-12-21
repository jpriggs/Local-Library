var Genre = require('../models/genre');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all Genre.
exports.genre_list = function (req, res) {
    res.send('NOT IMPLEMENTED: Genre list');
};

// Display detail page for a specific Genre.
exports.genre_detail = function (req, res) {
    res.send('NOT IMPLEMENTED: Genre detail: ' + req.params.id);
};

// Display Genre create form on GET.
exports.genre_create_get = function(req, res, next) {
    res.render('genre_form', { title: 'Create Genre' });
    //res.send('NOT IMPLEMENTED: Genre create GET');
};

// Handle Genre create on POST.
exports.genre_create_post = [

    //Validate that the name field is not empty
    body('name', 'Genre name required').isLength({ min: 1 }).trim(),

    //Sanitize (trim and escape) the name field
    sanitizeBody('name').trim().escape(),

    //Process request after validation and sanitization
    (req, res, next) => {
        //Extract the validation errors from a request
        const errors = validationResult(req);

        //Create a genre object with escaped and trimmed data
        var genre = new Genre(
            {
                name: req.body.name
            }
        );

        if (!errors.isEmpty()) {
            //There are errors. Render the form again with the sanitized values/error messages.
            res.render('genre_form', {
                title: 'Create Genre',
                genre: genre,
                errors: errors.array()
            });
            return;
        }
        else {
            //Data from form is valid and checks if Genre with same name already exists.
            Genre.findOne({
                'name': req.body.name
            })
            .exec(function(err, found_genre) {
                if (err) {
                    return next(err);
                }
                if (found_genre) {
                    //Genre exists, redirect to it's detail page.
                    res.redirect(found_genre.url);
                }
                else {
                    genre.save(function(err) {
                        if (err) {
                            return next(err);
                        }
                        //Genre saved, redirects to genre detail page.
                        res.redirect(genre.url);
                    });
                }
            });
        }
    }
    //res.send('NOT IMPLEMENTED: Genre create POST');
];

// Display Genre delete form on GET.
exports.genre_delete_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Genre delete GET');
};

// Handle Genre delete on POST.
exports.genre_delete_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Genre delete POST');
};

// Display Genre update form on GET.
exports.genre_update_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Genre update GET');
};

// Handle Genre update on POST.
exports.genre_update_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Genre update POST');
};
