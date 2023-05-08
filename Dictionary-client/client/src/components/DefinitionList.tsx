import { Box, Paper, Typography } from "@mui/material"

interface Definition {
  word:string,
  def:string
}

interface Props {
  definitions: Definition[]
}

export const DefinitionList = ({definitions} : Props ) => {
  return (
    <Box>
      {definitions.map((definition)=>(
        <Paper key={definition.word}>
          <Typography>{definition.word}</Typography>
          <Typography>{definition.def}</Typography>

        </Paper>
      ))}

    </Box>
  )
}
