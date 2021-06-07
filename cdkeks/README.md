# cdkeks
Higher-level hybrid cdk|cdk8s construct to build an eks kubernetes platform with batteries included:

- Network policies with [aws-calico](https://github.com/aws/eks-charts/tree/master/stable/aws-calico)
- DNS management with [external-dns](https://github.com/kubernetes-sigs/external-dns)
- Forwarding logs to CloudWatch Logs or ElasticSearch with [fluent-bit](https://github.com/aws/aws-for-fluent-bit)
- Ingress management with the [aws load balancer controller](https://github.com/kubernetes-sigs/aws-load-balancer-controller)

:warning: This is experimental and subject to breaking changes.

## Install
TypeScript/JavaScript:

```bash
npm install --save cdkeks
```

Python:

```bash
pip install cdkeks
```

## Howto use

### Install Addons
```typescript
const platform = new Platform(this, 'Platform', {
  cluster,
  addons: [new AwsCalicoAddon(), new AwsLoadBalancerControllerAddon()/*,...*/],
});
```
See more [addons](https://github.com/hupe1980/cdkeks/tree/main/cdkeks/src/addons).

### AlbIngress
```typescript
const deployment = new Deployment(this, 'Deployment', {
  platform,
  containers: [
    {
      image: 'nginx',
    },
  ],
});

const backend = IngressBackend.fromService(deployment.expose('Service', 80));

const ingress = new AlbIngress(this, 'Ingress', {
  platform,
  targetType: TargetType.IP,
  internetFacing: true,
});

ingress.connections.allowFromAnyIpv4(Port.tcp(80));
ingress.addRule('/', backend);
```

### LoadBalancer
```typescript
const deployment = new Deployment(this, 'Deployment', {
  platform,
  containers: [
    {
      image: 'nginx',
    },
  ],
});

deployment.expose('LoadBalancer', 80, {
  serviceType: ServiceType.LOAD_BALANCER,
});
```

## API Reference

See [API.md](https://github.com/hupe1980/cdkeks/tree/master/cdkeks/API.md).

## Example

See more complete [examples](https://github.com/hupe1980/cdkeks/tree/main/examples).

## License
[MIT](https://github.com/hupe1980/cdkeks/tree/main/cdkeks/LICENSE)