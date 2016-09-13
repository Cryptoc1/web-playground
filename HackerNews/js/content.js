// Load sources from localStorage
var subreddits;

function loadSources() {
    var retreivedData = localStorage.getItem('Subreddits');
    subreddits = JSON.parse(retreivedData);
};

function updateSources() {
    localStorage.setItem('Subreddits', JSON.stringify(subreddits));
    setTimeout(location.reload(), 500);
};

// Content control 
function getContent() {
    loadSources();
    if (subreddits != undefined) {
        for (var i = 0; i < subreddits.length; i++) {
            reddit.top(subreddits[i]).limit(20).fetch(function (res) {
                    var sortedByScore = res.data.children.sort(function (a, b) {
                        return parseFloat(b.data.score) - parseFloat(a.data.score)
                    });
                    for (var i = 0; i < sortedByScore.length; i++) {
                        var bodContainer = document.getElementById('bodContainer');
                        var Article = document.createElement('div');
                        Article.className = 'Article';
                        Article.setAttribute('onclick', 'goto("' + (sortedByScore[i].data.url) + '")');
                        Article.setAttribute('uid', sortedByScore[i].data.id);
                        var Title = document.createElement('span');
                        Title.className = 'Title';
                        Title.innerHTML = (sortedByScore[i].data.title);
                        // Article Thumbnails, feature is buggy so currently inactive
                        /* if (!(sortedByScore[i].data.thumbnail == "" || sortedByScore[i].data.thumbnail == "self" || sortedByScore[i].data.thumbnail == "default")) {
                            var Breif = document.createElement('div');
                            Breif.className = 'Breif';
                            Breif.innerHTML = '<img src="' + (sortedByScore[i].data.thumbnail) + '" class="thumbnail">';
                            Article.appendChild(Breif);
                        } */
                        var Options = document.createElement('div');
                        Options.className = 'Options';
                        var Comment = document.createElement('img');
                        Comment.className = 'Comment';
                        Comment.setAttribute('src', 'img/speech_bubble-24.png');
                        Comment.setAttribute('onclick', 'goto("http://reddit.com' + (sortedByScore[i].data.permalink) + '")');
                        Comment.setAttribute('title', 'Comments');
                        var Author = document.createElement('img');
                        Author.className = 'Author';
                        Author.setAttribute('src', 'img/user-24.png');
                        Author.setAttribute('title', 'Author: ' + (sortedByScore[i].data.author));
                        var Source = document.createElement('img');
                        Source.className = 'Source';
                        Source.setAttribute('src', 'img/domain-24.png');
                        Source.setAttribute('onclick', 'goto("http://' + (sortedByScore[i].data.domain) + '")');
                        Source.setAttribute('title', 'Source: ' + (sortedByScore[i].data.domain));
                        Options.appendChild(Comment);
                        Options.appendChild(Author);
                        Options.appendChild(Source);
                        Article.appendChild(Title);

                        Article.appendChild(Options);

                        bodContainer.appendChild(Article);
                    }
                },
                function (err) {
                    var bodContainer = document.getElementById('bodContainer');
                    var Article = document.createElement('div');
                    Article.className = 'Article noClick';
                    var Title = document.createElement('span');
                    Title.className = 'Title';
                    Title.innerHTML = 'There Was an Error Attempting to Fetch a Source', Error;
                    Article.appendChild(Title);

                    bodContainer.appendChild(Article);
                });
        }
    }
    setTimeout(footer, 1500);
}

// Redirect
function goto(url) {
    window.open(url, '_blank');
}