import { Component } from "../core/component"
import { apiService } from "../services/api.service";
import { renderPosts } from '../templates/post.template';

export class FavoriteComponent extends Component {
    constructor(id, options) {
        super(id);

        this.loader = options.loader;
    }

    init() {
        this.$el.addEventListener('click', linkClickHandler.bind(this));
    }

    onShow() {
        const favorites = JSON.parse(localStorage.getItem('favorites'));
        const html = renderList(favorites);
        this.$el.insertAdjacentHTML('afterbegin', html);
    }

    onHide() {
        this.$el.innerHTML = '';
    }
}

async function linkClickHandler(event) {
    event.preventDefault();

    if(event.target.classList.contains('js-link')) {
        const postId = event.target.dataset.id;
        this.$el.innerHTML = '';
        this.loader.show();
        const post = await apiService.fetchPostsById(postId);
        this.loader.hide();
        this.$el.insertAdjacentHTML('afterbegin', renderPosts(post, {withButton: false}));
        
    } else if(event.target.classList.contains('button-warning')) {
        this.onHide();
        // this.loader.show();
        this.onShow();
        // this.loader.hide();
    }

    
}

function renderList (list = []) {
    if(list && list.length) {
        return `
        <ul>
            ${list.map(i => `<li class="list-item"><a href="" class="js-link button button-primary-text list-item-a" data-id="${i.id}" >${i.title}</a></li>`).join(' ')}
        </ul>
        `

    }

    return `<p class="center">Вы пока ничего не добавили</p>`;
}

