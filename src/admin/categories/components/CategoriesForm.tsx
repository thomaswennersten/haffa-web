import { FC, useContext } from 'react'
import { Tree } from 'antd'
import { Box, Button, Grid, TextField } from '@mui/material'
import { Category } from 'categories/types'
import { nanoid } from 'nanoid'
import { PhraseContext } from 'phrases/PhraseContext'
import { useTree } from './use-tree'

const cat = (label: string, ...categories: Category[]): Category => ({
    id: nanoid(),
    label,
    categories,
})

export const CategoriesForm: FC<{ categories: Category[] }> = ({
    categories,
}) => {
    const { phrase } = useContext(PhraseContext)

    const { treeProps, selectedNode, mutateSelected, mutateNodes, removeNode } =
        useTree(
            categories,
            (c) => c.id,
            (c) => c.label,
            (c) => c.categories
        )
    return (
        <Grid container>
            <Grid item sm={12} md={6}>
                <Tree style={{ fontSize: 'x-large' }} {...treeProps} />
            </Grid>
            <Grid item sm={12} md={6}>
                <Button
                    variant="outlined"
                    onClick={() =>
                        selectedNode
                            ? mutateSelected(({ categories }) => ({
                                  categories: [
                                      ...categories,
                                      cat('Ny kategori'),
                                  ],
                              }))
                            : mutateNodes((nodes) => [
                                  ...nodes,
                                  cat('Ny kategori'),
                              ])
                    }
                >
                    {phrase('', 'Lägg till ny kategori')}
                </Button>

                {selectedNode && (
                    <Box>
                        <TextField
                            value={selectedNode.label}
                            onChange={(e) =>
                                mutateSelected(() => ({
                                    label: e.target.value,
                                }))
                            }
                        />
                    </Box>
                )}
                {selectedNode && (
                    <Button onClick={() => removeNode(selectedNode)}>
                        {phrase('', 'Ta bort kategori')}
                    </Button>
                )}
                <pre>
                    <code>{JSON.stringify(selectedNode, null, 2)}</code>
                </pre>
            </Grid>
        </Grid>
    )
}
