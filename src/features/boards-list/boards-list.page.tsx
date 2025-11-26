import { href, Link } from 'react-router-dom'
import { ROUTES } from '@/shared/model/routes.ts'
import { CONFIG } from '@/shared/model/config.ts'
import { rqClient } from '@/shared/api/instance.ts'
import type { FormEvent } from 'react'
import { useQueryClient } from '@tanstack/react-query'

function BoardsListPage() {
  const queryClient = useQueryClient()
  const boardsQuery = rqClient.useQuery('get', '/boards')

  const createBoardMutation = rqClient.useMutation('post', '/boards', {
    onSettled: async () => {
      await queryClient.invalidateQueries(
        rqClient.queryOptions('get', '/boards'),
      )
    },
  })
  const deleteBoardMutation = rqClient.useMutation(
    'delete',
    '/boards/{boardId}',
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(
          rqClient.queryOptions('get', '/boards'),
        )
      },
    },
  )

  const handleCreateBoardFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const name = formData.get('name') as string
    createBoardMutation.mutate({ body: { name } })
  }

  return (
    <div>
      <h1>Boards list</h1>

      <h2>{CONFIG.API_BASE_URL}</h2>

      <form onSubmit={handleCreateBoardFormSubmit}>
        <input name="name" placeholder="Board name" />
        <button type="submit" disabled={createBoardMutation.isPending}>
          Create board
        </button>
      </form>

      {boardsQuery.data?.map((board) => (
        <div key={board.id}>
          <Link to={href(ROUTES.BOARD, { boardId: board.id })}>
            {board.name}
          </Link>
          <button
            disabled={boardsQuery.isPending}
            onClick={() =>
              deleteBoardMutation.mutate({
                params: { path: { boardId: board.id } },
              })
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}

export const Component = BoardsListPage
