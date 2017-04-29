var view = (function() {
    "use strict";

    // on page load
    window.onload = function scheduler(e) {
        document.dispatchEvent(new CustomEvent('onDocumentLoaded'));
    };

    /** Listeners **/
    var projectGallery = document.getElementsByClassName('project-preview-thumb');

    var loadProjectGallery = function() {
        for (var i = 0; i < projectGallery.length; i++) {
            projectGallery[i].addEventListener('click', function() {
                var data = {};
                data.id = this.id;

                document.dispatchEvent(new CustomEvent('onThumbnailClicked', {
                    'detail': data
                }));

            });
        }
    };



    /** View methods */
    var view = {};

    view.hideProjectThumbnails = function() {
        var projectThumbnails = document.getElementById('project-thumbnails');
        projectThumbnails.className = "animated fadeOut";
        projectThumbnails.style.visibility = "hidden";
    };

    view.showProjectThumbnails = function() {
        var projectThumbnails = document.getElementById('project-thumbnails');
        projectThumbnails.style.visibility = "visible";
        projectThumbnails.className = "animated fadeIn";
        loadProjectGallery();
    };

    view.loadProjectThumbnails = function(data) {

        var content = ``;
        var dataKeys = Object.keys(data);
        console.log(data);
        console.log(dataKeys);
        console.log(data[dataKeys[0]]['title']);

        for (var i = 0; i < dataKeys.length; i++) {
            var newID = dataKeys[i];;
            var title = data[dataKeys[i]]['title'];
            var thumbnailRef = data[dataKeys[i]]['thumbnail'];
            var altName = title.concat("_preview");

            content += `<div class='col-xs-12 project-preview-thumb' id='${newID}'>
                            <img class="img-responsive p-thumb-img" id='${newID}-thumb' src="${thumbnailRef}" alt="${altName}">
                            <div class='text-preview' >${title}</div>
                        </div>`;


        }

        var thumbnailPreview = document.getElementById('project-thumbnails');
        thumbnailPreview.innerHTML = content;

        loadProjectGallery();

    };

    view.createProjectPage = function(data) {
        var newID = data.id;
        var thumbnailRef = data.project.thumbnail;
        var title = data.project.title;
        var desc = data.project.description;
        var url = data.project.url;
        var altName = newID.concat("_preview");

        var content = `<div class='row animated fadeIn'>
                            <div class='col-xs-12'>
                                 <button type="button" class="close pull-left" aria-label="Close" id="project-exit">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class='col-xs-12'>
                                <div class='row'>
                                    <div class='col-xs-12'>
                                        <a href='${url}' target='_blank'><img class="img-responsive" src="${thumbnailRef}" alt="${altName}"></a>
                                    </div>
                                </div>
                            </div>
                            <div class='col-xs-12'>
                                <div class='row' id='project-info'>
                                    <div class='col-xs-12'>
                                        <h5 id='project-title'><a href='${url}' target='_blank'><strong>${title}</strong></a></h5>
                                    </div>
                                    <div class='col-xs-12'>
                                        <p id='project-desc'>${desc}</p>
                                        <p id='project-link'>Click <a href='${url}' target='_blank'>here</a> to check it out.</p>
                                    </div>
                                </div>
                            </div>
                        </div>`;


        var projectPreview = document.getElementById('project-preview');
        projectPreview.innerHTML = content;
        projectPreview.style.visibility = "visible";

        // hide url if there is none
        if (url) {
            var projectLink = document.getElementById('project-link');
            projectLink.style.visibility = "visible";
        } else {
            var projectLink = document.getElementById('project-link');
            projectLink.style.visibility = "hidden";
        }

        // add event listener for exiting project preview
        var exitProject = document.getElementById('project-exit').addEventListener('click', function() {
            view.hideProjectPreview();
        });



    };

    view.hideProjectPreview = function() {
        var projectPreview = document.getElementById('project-preview');
        projectPreview.innerHTML = ""
        view.showProjectThumbnails();
    };


    return view;

}());
