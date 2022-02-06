import * as path from 'path'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeResolvers } from '@graphql-tools/merge'
import { APP } from '../../constants'

const resolversPath = path.join(APP.ROOT_DIR, 'modules/**/resolvers/index.ts')
const allResolvers = loadFilesSync(resolversPath)
const resolvers = mergeResolvers(allResolvers)

export { resolvers }