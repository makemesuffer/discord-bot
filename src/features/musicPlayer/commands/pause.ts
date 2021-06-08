import { CommandMessage } from '@typeit/discord';
import { Message } from 'discord.js';

import BaseCommand from '../../../helpers/baseCommand';
import SongQueueModel from '../models/songQueue.model';

class Pause extends BaseCommand {
  constructor() {
    super('pause', 'Pause a song!');
  }

  async execute(
    message: CommandMessage,
    queue: Map<string, SongQueueModel>
  ): Promise<Message> {
    const serverQueue = queue.get(message.guild.id);
    if (!message.member.voice.channel) {
      return message.channel.send(
        'You have to be in a voice channel to pause the music!'
      );
    }
    if (!serverQueue) {
      return message.channel.send('There is no song in queue!');
    }
    if (serverQueue.connection.dispatcher.paused) {
      return message.channel.send('Song is already paused');
    } else {
      serverQueue.connection.dispatcher.pause();
      return message.channel.send('Song is paused');
    }
  }
}

export default Pause;
