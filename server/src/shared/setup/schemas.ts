import * as path from 'path'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { APP } from '../../constants'

const schemasPath = path.join(APP.ROOT_DIR, 'modules/**/schemas/*.gql')
const allTypeDefs = loadFilesSync(schemasPath)
const typeDefs = mergeTypeDefs(allTypeDefs)

export { typeDefs }
