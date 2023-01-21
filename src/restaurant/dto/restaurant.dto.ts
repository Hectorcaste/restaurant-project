import { ApiProperty } from '@nestjs/swagger';

/**
 * dto for the body request 
 */
export class preferences {
    @ApiProperty({ example: ["burger,meat,pizza"] })
    plates: [string];
}