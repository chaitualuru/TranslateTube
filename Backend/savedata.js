var ref = new Firebase("translatetube.firebaseIO.com");

var videosRef = ref.child("videos");

function addVideo(youtube_id, soundcloud_token, language, category) {
	videosRef.push({
		id: youtube_id,
		token: soundcloud_token,
		lang: language,
		cat: category
	});
}
