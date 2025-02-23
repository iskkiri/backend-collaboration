import { Body, Controller, Post } from '@nestjs/common';
import { FcmService } from './fcm.service';
import type { UnsubscribeFromTopicRequestDto } from './dtos/unsubscribe-from-topic.dto';
import type { SubscribeToTopicRequestDto } from './dtos/subscribe-to-topic.dto';
import type { SendMessageRequestDto } from './dtos/send-message.dto';
import type { SendMessagesRequestDto } from './dtos/send-messages.dto';
import type { SendTopicMessagesRequestDto } from './dtos/send-topic-message.dto';

@Controller('fcm')
export class FcmController {
  constructor(private readonly fcmService: FcmService) {}

  // 토픽 구독
  @Post('subscribe')
  async subscribeToTopic(@Body() { token, topic }: SubscribeToTopicRequestDto) {
    return this.fcmService.subscribeToTopic(token, topic);
  }

  // 토픽 구독 취소
  @Post('unsubscribe')
  async unsubscribeFromTopic(
    @Body() { token, topic }: UnsubscribeFromTopicRequestDto
  ) {
    return this.fcmService.unsubscribeFromTopic(token, topic);
  }

  // 단일 메시지 전송
  @Post('message')
  async sendMessage(@Body() { token, title, message }: SendMessageRequestDto) {
    return this.fcmService.sendMessage({
      token,
      data: {
        title,
        message,
      },
    });
  }

  // 다중 메시지 전송
  @Post('messages')
  async sendMultipleMessages(
    @Body() { tokens, title, message }: SendMessagesRequestDto
  ) {
    return this.fcmService.sendMultipleMessages({
      tokens,
      data: {
        title,
        message,
      },
    });
  }

  // 토픽 메시지 전송
  @Post('topic-messages')
  async sendTopicMessages(
    @Body() { topic, title, message }: SendTopicMessagesRequestDto
  ) {
    return this.fcmService.sendTopicMessages({
      topic,
      data: {
        title,
        message,
      },
    });
  }
}
