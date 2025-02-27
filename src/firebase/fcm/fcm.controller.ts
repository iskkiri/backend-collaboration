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
      // iOS의 경우 notification이 없으면 메시지가 전송되지 않음
      apns: {
        payload: {
          aps: {
            contentAvailable: true,
            alert: {
              title: '터미타임',
              body: '여기에 공지사항 제목',
            },
          },
        },
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
      // iOS는 notification으로만 보내야 하는가?
      notification: {
        title,
        body: message,
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
      // iOS의 경우 notification이 없으면 메시지가 전송되지 않음
      apns: {
        payload: {
          aps: {
            contentAvailable: true,
            alert: {
              title: '터미타임',
              body: '여기에 공지사항 제목',
            },
          },
        },
      },
    });
  }
}
