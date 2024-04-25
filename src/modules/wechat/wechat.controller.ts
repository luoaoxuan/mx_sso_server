import { Controller, Get, Post, Body, Patch, Param, Delete, All, Query, UseInterceptors, Res } from '@nestjs/common';
import { WechatService } from './wechat.service';
import { CreateWechatDto } from './dto/create-wechat.dto';
import { UpdateWechatDto } from './dto/update-wechat.dto';
import { Request ,Response} from 'express';


@Controller('wechat')
export class WechatController {
  constructor(private readonly wechatService: WechatService) {}


 
  @Get('check')
  checkSignature(@Query() query:WechatParams,@Res() res:Response){
    res.send(this.wechatService.checkSignature(query))
  }



  @Get()
  findAll() {
    return this.wechatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wechatService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWechatDto: UpdateWechatDto) {
    return this.wechatService.update(+id, updateWechatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wechatService.remove(+id);
  }
}
