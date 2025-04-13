import useFetch from "../hooks/useFetch";
import { path } from "../utils/path";
import { Link } from "react-router-dom";

const Home = () => {
  const { data, loading, error } = useFetch(`${path}/get-posts`);
  const {
    data: topPost,
    loading: tLoading,
    error: tErr,
  } = useFetch(`${path}/get-top-post`);
  console.log(data);

  return (
    <div className="min-h-screen">

      <header className="bg-primary-color py-12 px-6 text-center">
        <h1 className="font-saira text-4xl text-white font-bold">Explained</h1>
        <div>
          <Link className="border-r px-1">Home</Link>
          <Link className="px-1">Category</Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-3 space-y-8">
            {data?.map((category) => {
              return (
                <div key={category._id}>
                  {category.posts.length > 0 &&
                    category.posts.map((post) => {
                      if (post.heading === false && post.priority > 4) {
                        return (
                          <Link
                            key={post._id}
                            to={`/post/${post.slug}`}
                            className="block p-4 border-2 border-primary-color hover:border-primary-color/80 transition-colors mb-6 rounded-lg"
                          >
                            <p className="text-sm font-medium text-primary-color uppercase tracking-wide mb-2">
                              {post.category}
                            </p>
                            <h3 className="font-play-fair font-bold text-xl mb-3 line-clamp-2">
                              {post.title}
                            </h3>
                            <div
                              className="prose prose-sm mb-3 line-clamp-3"
                              dangerouslySetInnerHTML={{
                                __html: post.article.slice(0, 100),
                              }}
                            />
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">By </span>
                              {post.author[0]}
                            </p>
                          </Link>
                        );
                      }
                    })}
                </div>
              );
            })}
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-12">
            <section>
              {topPost && (
                <div>
                  <Link
                    key={topPost._id}
                    to={`/big-post/${topPost.slug}`}
                    className="group block"
                  >
                    <div className="aspect-[16/9] overflow-hidden rounded-xl">
                      <img
                        src={topPost.coverImage}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="mt-6 text-center max-w-3xl mx-auto">
                      <p className="font-play-fair text-sm text-gray-600 mb-3">
                        By {topPost.author[0]}
                      </p>
                      <h2 className="font-play-fair text-4xl font-bold mb-4 group-hover:text-primary-color transition-colors">
                        {topPost.title}
                      </h2>
                      <div
                        className="prose prose-lg mx-auto"
                        dangerouslySetInnerHTML={{
                          __html: topPost.article.slice(0, 200),
                        }}
                      />
                    </div>
                  </Link>
                </div>
              )}
            </section>

            {/* Featured Post */}

            {/* Category Posts */}
            {data?.map((category) => {
              if (
                category.priority <= 4 &&
                category.posts.length > 0 
                // category.posts.every((post) => post.priority > 3)
              ) {
                return (
                  <section key={category._id} className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="h-px bg-primary-color flex-1" />
                      <h2 className="font-satisfy text-2xl text-green-500 flex-shrink-0">
                        {category.name}
                      </h2>
                      <div className="h-px bg-primary-color flex-1" />
                    </div>
                    {category.posts.map((post) => {
                      if (!post.heading && post.priority <5) {
                        return (
                          <div key={post._id}>
                            <Link
                              to={`/post/${post.slug}`}
                              className="flex gap-8 p-6 border-2 border-primary-color rounded-lg hover:border-primary-color/80 transition-colors"
                            >
                              <div className="flex-1">
                                <h3 className="font-bold text-xl mb-3">
                                  {post.title}
                                </h3>
                                <div
                                  className="prose"
                                  dangerouslySetInnerHTML={{
                                    __html: `${post.article.slice(0, 200)}...`,
                                  }}
                                />
                              </div>
                              <div className="w-48 h-32">
                                <img
                                  src={post.coverImage}
                                  alt={`${post.title} cover`}
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              </div>
                            </Link>
                          </div>
                        );
                      }
                    })}
                  </section>
                );
              }
            })}

            {/* {data?.map((category) => {
              if (
                category.priority < 4 &&
                !category.posts.some((post) => post.priority === 1)
              ) {
                return (
                  <section key={category._id} className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="h-px bg-primary-color flex-1" />
                      <h2 className="font-satisfy text-2xl text-green-500 flex-shrink-0">
                        {category.name}
                      </h2>
                      <div className="h-px bg-primary-color flex-1" />
                    </div>

                    <div className="grid gap-6">
                      {category.posts.map((post) => (
                        <Link
                          key={post._id}
                          to={`/post/${post._id}`}
                          className="flex gap-8 p-6 border-2 border-primary-color rounded-lg hover:border-primary-color/80 transition-colors"
                        >
                          <div className="flex-1">
                            <h3 className="font-bold text-xl mb-3">
                              {post.title}
                            </h3>
                            <div
                              className="prose"
                              dangerouslySetInnerHTML={{
                                __html: `${post.article.slice(0, 20)}...`,
                              }}
                            />
                          </div>
                          <div className="w-48 h-32">
                            <img
                              src={post.coverImage}
                              alt={`${post.title} cover`}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                );
              }
            })} */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
