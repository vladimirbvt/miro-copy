import { href, Link } from 'react-router-dom'
import { ROUTES } from '@/shared/model/routes.ts'
import { CONFIG } from '@/shared/model/config.ts'
import { rqClient } from '@/shared/api/instance.ts'
import type { FormEvent } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Card, CardFooter, CardHeader } from '@/shared/ui/kit/card'
import { Button } from '@/shared/ui/kit/button.tsx'

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
    <div className="container mx-auto px-4">
      <h1>Boards list</h1>

      <h2>{CONFIG.API_BASE_URL}</h2>

      <form onSubmit={handleCreateBoardFormSubmit}>
        <input name="name" placeholder="Board name" />
        <button type="submit" disabled={createBoardMutation.isPending}>
          Create board
        </button>
      </form>

      <div className="grid grid-cols-3 gap-4">
        {boardsQuery.data?.map((board) => (
          <Card key={board.id} className="bg-gray-200">
            <CardHeader>
              <Button asChild variant="link">
                <Link to={href(ROUTES.BOARD, { boardId: board.id })}>
                  {board.name}
                </Link>
              </Button>
            </CardHeader>

            <CardFooter>
              <Button
                variant="destructive"
                disabled={boardsQuery.isPending}
                onClick={() =>
                  deleteBoardMutation.mutate({
                    params: { path: { boardId: board.id } },
                  })
                }
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export const Component = BoardsListPage
