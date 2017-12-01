function genCloneButton(protocol, cloneUrl) {
    var branch = $('.file-navigation').find('.js-url-field').attr('data-ref');
    var cloneURL = getCloneURL(branch, cloneUrl);
    
    var button = $('<a>').attr({
        "href": cloneURL,
        "class": "btn btn-sm tooltipped tooltipped-s tooltipped-multiline BtnGroup-item",
        "aria-label": "Open in SourceTree"
    });
    button.append($('<img />').css({"margin-right": "10px"}).attr("src", chrome.extension.getURL('icon/' + protocol + '.png')));
    return button;
}

function getCloneURL(branch, cloneUrl) {
    branch = branch || "master";
    return "sourcetree://checkoutRef?ref=" + branch + "&cloneUrl=" + cloneUrl + "&type=bitbucket";
}

// Create a new section for Sourcetree buttons:
var btnGroup = $('<div>').attr({ "class": "BtnGroup float-right" });
btnGroup.prependTo('.file-navigation.in-mid-page');

// Generate clone buttons:
$('.clone-options').each(function (i, urlDOM) {
	var protocols = ['http', 'ssh'];
	var protocol = $(urlDOM).attr('data-protocol-type') || protocols[i];
	
	if (protocol.match(/(ssh|http)/)) {
	    var cloneUrl = $(urlDOM).find('input.js-url-field').val();
	    if (cloneUrl) { 
          var button = genCloneButton(protocol, cloneUrl);
          btnGroup.append(button);
	    }
	}
});
