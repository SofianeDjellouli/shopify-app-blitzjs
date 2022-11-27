import { BlitzConfig, sessionMiddleware, simpleRolesIsAuthorized } from 'blitz'

const config: BlitzConfig = {
  experimental: {
    esmExternals: 'loose',
  },
}

module.exports = config
