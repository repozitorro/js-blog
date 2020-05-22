class ApiService {
    constructor(baseUrl) {
        this.url = baseUrl;
    }

    async createPost(post) {
        try {
            const request = new Request(this.url + '/posts.json', {
                method: 'post',
                body: JSON.stringify(post)
            });
            const response = await fetch(request);
            return await response.json();
            //return useRequest(request);

        } catch (error) {
            console.error(error);
        }
    }

    async fetchPosts() {
        try {
            const request = new Request(`${this.url}/posts.json`, {
                method: 'get'
            });
            const response = await fetch(request);
            return await response.json();
            //return useRequest(request);

        } catch (error) {
            console.error(error);
        }
    }

    async fetchPostsById(id) {
        try {
            const request = new Request(`${this.url}/posts/${id}.json`, {
                method: 'get'
            });
            const response = await fetch(request);
            return await response.json();
            //return useRequest(request);

        } catch (error) {
            console.error(error);
        }
    }
}

// function useRequest(request) {
//     const response = await fetch(request);
//     return await response.json();
// }

export const apiService = new ApiService('https://blog-js-f636a.firebaseio.com');