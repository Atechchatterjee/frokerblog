## Indroduction

This is the submission for “Full Stack Web Development Assignment (Using MERN)”.

Technology Stack used: React + Nextjs + Tailwind CSS (for frontend), Nodejs + Express + Mongodb (for backend)

#### Deployment link

- vercel deployment (frontend): [https://frokerblog.vercel.app](https://frokerblog.vercel.app)
- railway deployment (backend): [frokerblog-production.up.railway.app](frokerblog-production.up.railway.app)

#### Requirements

- Compulsory

  - [x] Technology stack used - MERN
  - [x] Visual difference less than 30%
  - [x] Like Functionality
  - [x] Pagination support
  - [x] Content Management (Ability for the user to create content)
  - [x] Usage of dummy images (used an API to fetch dummy images - [https://picsum.photos/](https://picsum.photos/))

- Optional

  - [x] Newsletter subscription (for frontend)
  - [x] Hosted - (frontend - vercel, backend node.js - railways, mongodb - MongoAtlas)

- Additional Features
  - [x] Rich Text Support (using [Tiptap](https://tiptap.dev/))

#### Installation

Clone the git repo

```bash
git clone https://github.com/Atechchatterjee/frokerblog
```

Run the frontend on dev

```bash
cd frontend/
npm install
npm run dev
```

Run the frontend in production

```bash
cd frontend/
npm install
npm run build
npm start
```

Run the backend in production

```bash
cd backend/
npm install
npm start
```

#### Usage

NavLinks:

- **Home:** to view all the blogs
- **Blogs:** to create a blog

frontend urls:

- **/** (to view all blog posts)
- **/post-blogs** (to create blogs)
- **/blog/[id]** (to view a blog)

backend end-points:

- **/fetch-all-blogs/?page=page_no&size=size&pinned=pinned** (to create blogs)
  - _page no._: the current page to be loaded (pagination)
  - _size no._: of blogs to be loaded for each page
  - _pinned no._: of blogs to be pinned in the home page
- **/fetch-blog?id=blog_id** (to fetch individual blogs)
- **/create-blogpost** (to create a blog post)
- **/update-likes** (update likes for a specific blog post)

#### Images

- Main Blog Page
  ![main-blog-page](https://utfs.io/f/618eeda0-73e2-4045-a9e3-f794f77fa988-1icsr2.png)
  ![main-blog-page-2](https://utfs.io/f/9b12f54f-3e18-490e-a4ec-18dab7726440-g3yu2u.png)
- Individual Blog Page
  ![individual-blog-page](https://utfs.io/f/e4a2e3cf-ce64-4f41-b22c-7ebdfbbd4374-g3ud2s.png)

- Blog Content Creation Page
  ![blog-content-creation-page](https://utfs.io/f/602b6f47-da37-4c2f-a469-2513b263b2d6-g3ud59.png)
