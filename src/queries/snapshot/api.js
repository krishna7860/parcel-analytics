import { useQuery } from "react-query";
import fetcher from "../../utils/fetcher";

export function useGetSpaces() {
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query: `query Spaces {
            spaces(
              first: 100000000,
              skip: 0,
              orderBy: "created",
              orderDirection: desc
            ) {
              id
              name
              about
              network
              symbol
              strategies {
                name
                network
                params
              }
              admins
              members
              filters {
                minScore
                onlyMembers
              }
              plugins
            }
          }
          `,
    }),
  };

  return async () =>
    await fetcher(
      `https://parcel-anywhere.herokuapp.com/${process.env.REACT_APP_SNAPSHOT_URL}/graphql`,
      options
    );
}

export function useGetSpace(spaceId, networkId = 1, queryOptions = {}) {
  const spaceIdStr = JSON.stringify(spaceId);

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query: `query Space {
                space(id:${spaceIdStr}) {
                  id
                  name
                  about
                  network
                  symbol
                  strategies {
                    name
                    network
                    params
                  }
                  admins
                  members
                  filters {
                    minScore
                    onlyMembers
                  }
                  plugins
                }
              }
          `,
    }),
  };
  return useQuery(
    "get-space",
    async () =>
      await fetcher(
        `https://parcel-anywhere.herokuapp.com/${process.env.REACT_APP_SNAPSHOT_URL}/graphql`,
        options
      ),
    { refetchOnWindowFocus: true, ...queryOptions }
  );
}

export function useGetProposals(spaces = [], networkId = 1) {
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query: `query Proposals {
                proposals(
                    first: 100000
                    skip: 0
                    where: { space_in: ${spaces} }
                    orderBy: "created"
                    orderDirection: desc
                ) {
                    id
                    title
                    body
                    choices
                    start
                    end
                    snapshot
                    state
                    author
                    space {
                        id
                        name
                    }
                }
            }
          `,
    }),
  };
  return useQuery(
    "get-proposals",
    async () =>
      await fetcher(
        `https://parcel-anywhere.herokuapp.com/${process.env.REACT_APP_SNAPSHOT_URL}/graphql`,
        options
      ),
    { refetchOnWindowFocus: true, enabled: true }
  );
}

export function useGetProposalById(id = "") {
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query: `query Proposal {
                proposal(id: "${id}") {
                  id
                  title
                  body
                  choices
                  start
                  end
                  snapshot
                  state
                  author
                  scores
                  space {
                    id
                    name
                  }
                }
              }
          `,
    }),
  };
  return useQuery(
    "get-proposals",
    async () =>
      await fetcher(
        `https://parcel-anywhere.herokuapp.com/${process.env.REACT_APP_SNAPSHOT_URL}/graphql`,
        options
      ),
    { enabled: !!id }
  );
}
