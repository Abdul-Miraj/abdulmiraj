var view = (function() {
    "use strict";

    // on page load
    window.onload = function scheduler(e) {
        loadProjectGallery();
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

view.createProjectPage = function(data) {
    var newID = data.id;
    var thumbnailRef = data.project.thumbnail;
    var title = data.project.title;
    var desc = data.project.description;
    var url = data.project.url;
    var altName = newID.concat("_preview");

    var content = `<div class='row animated zoomIn'>
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
                                <div class='row'>
                                    <div class='col-xs-12'>
                                        <h5 id='project-title'><a href='${url}' target='_blank'><strong>${title}</strong></a></h5>
                                    </div>
                                    <div class='col-xs-12'>
                                        <p id='project-desc'>${desc}</p>
                                        <p id='project-link'>Click <a href='${url}' target='_blank'>here</a> to check it out.</p>
                                    </div>
                                </div>
                            </div>
                        </div>`


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
