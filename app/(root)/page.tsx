import SearchForm from "@/components/SearchForm";
import StartupCard, {StartupCardProps} from "@/components/StartupCard";
import {STARTUPS_QUERY} from "@/sanity/lib/queries";
import {sanityFetch, SanityLive} from "@/sanity/lib/live";

export default async function Home({ searchParams } :{ searchParams: Promise<{ query?: string}>}) {
    const query = (await searchParams).query
    // const posts = await client.fetch(STARTUPS_QUERY)
    const params = { search: query || null }
    const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params })

    // console.log(JSON.stringify(posts, null, 2), "this is the console log output")
  return (
      <>
          <section>
              <h1>Pitch Your Idea <br/>Connect with Entrepreneur</h1>
              <p>Submit idea, Vote on Pitches, and Get Noticed in Virtual Competition.</p>
              <SearchForm query={query}/>
          </section>
          <section>
              <p>{query ? `Search result for "${query.length > 30 ? query.slice(0, 30) + '…' : query}"` : 'All Startup'}</p>
              <ul>
                  {
                      posts?.length > 0 ?  (
                          posts.map((post: StartupCardProps) => (
                                <StartupCard key={post?._id} post={post}/>
                              )
                          )
                      ) : (
                          <p>No startups found</p>
                      )
                  }
              </ul>
          </section>
          <SanityLive/>
      </>
  )
}
