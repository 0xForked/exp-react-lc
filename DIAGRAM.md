VIEW:

```mermaid
graph TD;
    App-->Auth;
    Auth-->Chat;
    Chat-->ActiveChat;
    Chat-->QueueChat;
    Chat-->AgentDetail;
    ActiveChat-->TransferAgent;
    TransferAgent-->AvailableAgent;
    ActiveChat-->DeactivatedChat;
    QueueChat-->PickFromQueue;
```
