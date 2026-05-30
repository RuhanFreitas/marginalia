import { PartialType } from '@nestjs/mapped-types'
import { CreateMarginaliaDTO } from './create-marginalia.dto'

export class UpdateMarginaliaDTO extends PartialType(CreateMarginaliaDTO) {}
